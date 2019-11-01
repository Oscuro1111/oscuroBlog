
function verifyPass() {
    let pass = document.getElementById("pass").innerHTML;
    let verifyPass_ = document.getElementById("verifyPass").innerHTML;

    if (pass == verifyPass_) {
        console.log("Hello");
        let form = document.getElementById("signUpForm");
        form.action="/signingUp";
        form.submit();
    } else {
        alert("<h2 style='color:red'>password is not matched with the verifying password!</h2>");
    }


}
