function showOTP() {
    let email = document.getElementById("email").value;
    let emailError = document.getElementById("emailError");
    let phoneNumber = document.getElementById("phoneNumber").value;
    let phoneError = document.getElementById("phoneError");

    let emailRegex = /^[a-zA-Z0-9._%+-]+@marmeto\.com$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = "Enter a valid email (e.g., user@marmeto.com)";
        return;
    } else {
        emailError.textContent = "";
    }

    let phoneRegex = /^\+\d{1,3}\s\d{6,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
        phoneError.textContent = "Enter a valid phone number (e.g., +44 9999999999)";
        return;
    } else {
        phoneError.textContent = "";
    }

    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
}

function showSuccess() {
    let otpInputs = document.querySelectorAll(".otp-input");
    let otpValue = "";

    otpInputs.forEach(input => {
        otpValue += input.value;
    });

    if (otpValue.length < 4) {
        alert("Please enter a valid 4-digit OTP.");
        return;
    }

    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
}

function goBackToStep1() {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "none";
    document.getElementById("step1").style.display = "block";
}

function goBackToStep2() {
    document.getElementById("step3").style.display = "none";
    document.getElementById("step2").style.display = "block";
}

document.querySelectorAll(".otp-input").forEach((input, index, elements) => {
    input.addEventListener("input", () => {
        if (input.value.length === 1 && index < elements.length - 1) {
            elements[index + 1].focus();
        }
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && index > 0 && input.value.length === 0) {
            elements[index - 1].focus();
        }
    });

    input.addEventListener("paste", (e) => {
        e.preventDefault(); 
        let pasteData = (e.clipboardData || window.clipboardData).getData("text").trim();
        
        if (/^\d{4}$/.test(pasteData)) {  
            pasteData.split("").forEach((char, idx) => {
                if (elements[idx]) {
                    elements[idx].value = char;
                }
            });
            elements[elements.length - 1].focus(); 
        }
    });
});
