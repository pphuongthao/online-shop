using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OnlineShop.Models
{
    public class RegisterModel
    {
        [Key]
        public long ID { get; set; }
        [Display(Name = "Username")]
        [Required(ErrorMessage = "Please enter your username")]
        public string UserName { get; set; }
        [Display(Name = "Password")]
        [StringLength(20, MinimumLength = 6, ErrorMessage = "Password is at least 6 characters")]
        [Required(ErrorMessage = "Please enter your password")]
        public string Password { get; set; }
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "Password incorrect!")]
        public string ConfirmPassword { get; set; }
        [Display(Name = "FullName")]
        [Required(ErrorMessage = "Please enter your fullname")]
        public string Name { get; set; }
        [Display(Name = "Address")]
        public string Address { get; set; }
        [Display(Name = "Email")]
        [Required(ErrorMessage = "Please enter your email")]
        public string Email { get; set; }
        [Display(Name = "PhoneNumber")]
        public string Phone { get; set; }
        [Display(Name = "Province")]
        public string ProvinceID { get; set; }
        [Display(Name = "District")]
        public string DistrictID { get; set; }

    }
}