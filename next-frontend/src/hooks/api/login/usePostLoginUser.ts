import { useMutation, UseMutationOptions } from "react-query";
import { axiosInstance } from "src/utils/url";
import { getLoginUserUrl } from "src/utils/url/login.url";



interface LoginUserProps {
    username: string;
    password: string;
}

export type LoginUserResultType = {
    username: string;
    id: string;
    email: string;
    access_token: string;
}

export const postLoginUser = async({username, password}: LoginUserProps) => {
    const props = {username, password};
    const response = await axiosInstance.post(
        getLoginUserUrl,
        props
    )
    return response.data;
}

export const usePostLoginUser = (
    mutateOptions?:UseMutationOptions<
      LoginUserResultType,
      Error,
      LoginUserProps
    >
) => {
    return useMutation<LoginUserResultType, Error, LoginUserProps>(
        postLoginUser,
        mutateOptions
    )
}