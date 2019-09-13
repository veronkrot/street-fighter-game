export const validationRules = {
    'name': {
        minLength: 2,
        maxLength: 10,
        errorMsg: 'Name should be a ...!',
        elSelector: '#fighter-name',
    },
    'defense': {
        min: 1,
        max: 8,
        errorMsg: 'Defense should be a number [1 , 8]!',
        elSelector: '#fighter-defense'
    },
    'source': {
        errorMsg: 'Source might be a URL (https://..)!',
        elSelector: '#fighter-source'
    },

    'attack': {
        min: 2,
        max: 10,
        errorMsg: 'Attack should be a number [2 , 10]!',
        elSelector: '#fighter-attack'
    },
    'health': {
        min: 30,
        max: 80,
        errorMsg: 'Health should be a number [30 , 80]!',
        elSelector: '#fighter-health'
    }
};

class Validation {

    attrNumValidation(inputValue, minValue, maxValue) {
            return (typeof inputValue === 'number') && (inputValue >= minValue) && (inputValue <= maxValue);
        }

    attrNameValidation(inputValue, minLength, maxLength) {
        return (typeof inputValue === 'string') && (inputValue.length >= minLength) && (inputValue.length <= maxLength);
    }

    attrSourceValidation(inputValue) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
            '((\\d{1,3}\\.){3}\\d{1,3}))'+
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
            '(\\?[;&a-z\\d%_.~+=-]*)?'+
            '(\\#[-a-z\\d_]*)?$','i');
        return !!pattern.test(inputValue);
    }

    validationFeedback(isValid, propName) {
        const validFeedback = document.querySelector(`.${propName}.valid-feedback`);
        const invalidFeedback = document.querySelector(`.${propName}.invalid-feedback`);
        if (isValid) {
            validFeedback.style.display = 'block';
            invalidFeedback.style.display = 'none';
        } else {
            invalidFeedback.style.display = 'block';
            validFeedback.style.display = 'none';
        }
    }
}

export const validation = new Validation();


