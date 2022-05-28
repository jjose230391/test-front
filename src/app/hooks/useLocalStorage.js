const useLocalStorage = (key) => {

    const localValue = () => {
        return localStorage.getItem(key)
    };

    const setLocalValue = async function (value) {
        try {
            return await localStorage.setItem(key, value);
        } catch (e) {
        }
    };

    return {localValue, setLocalValue};
};

export default useLocalStorage;
