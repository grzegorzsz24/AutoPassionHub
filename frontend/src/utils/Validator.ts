class Validator {
  private static readonly emailRegex = /\S+@\S+\.\S+/;
  private static readonly nickRegex = /^[a-z0-9]{5,25}$/;
  private static readonly passwordRegex = /.{8,}/;
  private static readonly nameRegex =
    /^[A-ZŁŚ][a-złóśćąęń]{1,20}(\s[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;
  private static readonly surnameRegex =
    /^[A-ZŁŚ][a-złóśćąęń]{1,20}(-[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;

  static isEmpty = (value: string): boolean => value.trim() === "";

  static isEmail = (value: string): boolean => {
    return this.emailRegex.test(value);
  };

  static isNick = (value: string): boolean => {
    return this.nickRegex.test(value);
  };

  static isPassword = (value: string): boolean => {
    return this.passwordRegex.test(value);
  };

  static isPasswordConfirm = (value: string, password: string): boolean => {
    return value === password;
  };

  static isName = (value: string): boolean => {
    return this.nameRegex.test(value);
  };

  static isSurname = (value: string): boolean => {
    return this.surnameRegex.test(value);
  };
}

export default Validator;
