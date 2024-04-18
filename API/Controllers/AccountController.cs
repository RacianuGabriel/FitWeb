using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private SignInManager<AppUser> _signInManager;
        private UserManager<AppUser> _userManager;
        private TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByEmailAsync(loginDTO.email);

            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.password, false);

            if (result.Succeeded)
            {
                var roles = await _userManager.GetRolesAsync(user);


                return CreateUserObject(user,roles.FirstOrDefault() ?? "Member");

            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await _userManager.FindByEmailAsync(registerDTO.Email) != null)
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }

            if (await _userManager.FindByNameAsync(registerDTO.Username) != null)
            {
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                DisplayName = registerDTO.DisplayName,
                Email = registerDTO.Email,
                UserName = registerDTO.Username,
            };
            var role = registerDTO.Role;

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (result.Succeeded)
            {
                
                if (role == "Trainer")
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, "Trainer");
                    if(!roleResult.Succeeded) return BadRequest("Failed to add to role");
                }
                else if(role == "Member")
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, "Member");
                    if(!roleResult.Succeeded) return BadRequest("Failed to add to role");
                }
                else return BadRequest("Role not found");

                return CreateUserObject(user,role);

            }

            return BadRequest("Problem registering user");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            var roles = await _userManager.GetRolesAsync(user);

            return CreateUserObject(user,roles.FirstOrDefault() ?? "Member");
        }

        private UserDTO CreateUserObject(AppUser user, string role)
        {
            return new UserDTO
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user).Result,
                Username = user.UserName,
                Image = "",
                Role = role
            };
        }

    }
}