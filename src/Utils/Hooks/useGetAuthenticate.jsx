import { useSelector } from "react-redux";

const useGetAuthenticate = ()=>{
    
    const { user, isLoggedIn } = useSelector((state) => state.auth);

}