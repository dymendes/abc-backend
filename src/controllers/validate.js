export const validate = {
  name(value) {
    if(value === undefined) {
      return false
    } else {
      return (/^[a-záàâãéèêíïóôõöúçñ]+/i).test(value)
    }
  },
  email(value) {
    if(value === undefined) {
      return false
    } else {
      return (/\S+@\S+\.\S+/).test(value)
    }
  },
  password(value) {
    if(value === undefined || value.length < 8) {
      return false
    } else {
      return true
    }
  },
  age(value) {
    if(value === undefined) {
      return false
    } else {
      return true
    }
  }
}