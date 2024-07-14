const useCheckAuth = () => {
    if (JSON.parse(localStorage.getItem('username'))) {
        return true
    } else {
        return false
    }
}
 
export default useCheckAuth;