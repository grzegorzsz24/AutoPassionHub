class Validator {
  static isEmpty = (value: string): boolean => value.trim() === "";

  static isEmail = (value: string): boolean => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(value);
  };

  static isNick = (value: string): boolean => {
    const regex = /^[a-z0-9]{5,25}$/;
    return regex.test(value);
  };

  static isPassword = (value: string): boolean => {
    const regex = /.{8,}/;
    return regex.test(value);
  };

  static isPasswordConfirm = (value: string, password: string): boolean => {
    return value === password;
  };

  static isName = (value: string): boolean => {
    const regex = /^[A-ZŁŚ][a-złóśćąęń]{1,20}(\s[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;
    return regex.test(value);
  };

  static isSurname = (value: string): boolean => {
    const regex = /^[A-ZŁŚ][a-złóśćąęń]{1,20}(-[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;
    return regex.test(value);
  };
}

export default Validator;
