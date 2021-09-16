export function validateRegister(body) {
  const validationResult = [];
  const { name, email, password } = body;

  if (!name) {
    validationResult.push("name is required");
  }

  if (!email) {
    validationResult.push("email is required");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    validationResult.push("please enter valid email");
  }

  if (!password) {
    validationResult.push("password is required");
  } else if (password.length < 5) {
    validationResult.push("password should be at least 5 characters");
  }
  return validationResult;
}

export function validateAddFeedback(body) {
  const validationResult = [];
  const { name, email, comment } = body;

  if (!name) {
    validationResult.push("name is required");
  }

  if (!email) {
    validationResult.push("email is required");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    validationResult.push("please enter valid email");
  }

  if (!comment) {
    validationResult.push("comment is required");
  }
  return validationResult;
}
