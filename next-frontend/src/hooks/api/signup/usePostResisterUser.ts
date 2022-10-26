import { useMutation, UseMutationOptions } from "react-query";
import { axiosInstance } from "src/utils/url";
import { jsonHeader } from "src/utils/url/header"
import { postRegisterUserUrl } from "src/utils/url/signup.url";

interface PostResgiterUserProps {
    username: string;
    email: string;
    password: string;
}


export const registerUser = async({username, email, password}: PostResgiterUserProps) => {
    const body = JSON.stringify({username, email, password})
    const headers = jsonHeader;
    const response = await axiosInstance.post(
        postRegisterUserUrl,
        body,
        {headers}
    )
    return response.data;
}

export const usePostRegisterUser = (
    mutationOptions?: UseMutationOptions<
      Omit<User, 'password'>,
      Error,
      PostResgiterUserProps
    >
) => {
    return useMutation<Omit<User, 'password'>, Error, PostResgiterUserProps>(
        registerUser,
        mutationOptions
    )
}