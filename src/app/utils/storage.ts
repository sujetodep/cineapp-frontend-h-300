export const setLocalStorage = (key: string, value: any, isJSON?: boolean) => {
    if (isJSON) {
        value = JSON.stringify(value);
    }
    localStorage.setItem(key, value)
}

export const deleteLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}

export const getLocalStorage = (key: string, isJSON?: boolean): any => {
    let value = localStorage.getItem(key);
    if (value !== null) {
        if (isJSON) {
            return JSON.parse(value);
        }
        return value;
    }

    if (isJSON) {
        return JSON.parse("{}");
    }

    return "";
}

export const setSessionStorage = (key: string, value: any, isJSON?: boolean) => {
    if (isJSON) {
        value = JSON.stringify(value);
    }
    sessionStorage.setItem(key, value);
}

export const getSessionStorage = (key: string, isJSON?: boolean): any => {
    let value = sessionStorage.getItem(key);
    if (value !== null) {
        if (isJSON) {
            return JSON.parse(value);
        }
        return value;
    }

    if (isJSON) {
        return JSON.parse("{}");
    }

    return "";
}
