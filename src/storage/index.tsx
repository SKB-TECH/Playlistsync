export const setData = (cle: string, data: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(cle, JSON.stringify(data));
    }
};

export const getData = (cle: string) => {
    let data = "";
    if (typeof window !== "undefined") {
        try {
            const datalocal = localStorage.getItem(cle);
            if (datalocal) {
                data = JSON.parse(datalocal);
            }
        } catch (e) {
            return null;
        }
    }
    return data;
};

export const removeItem = (cle: string) => {
    if (typeof window !== "undefined") {
        try {
            localStorage.removeItem(cle);
            return null;
        } catch (e) {
            return e;
        }
    }
    return null;
};

export const removeAll = () => {
    if (typeof window !== "undefined") {
        try {
            localStorage.clear();
        } catch (e) {
            console.log(e);
        }
    }
};

