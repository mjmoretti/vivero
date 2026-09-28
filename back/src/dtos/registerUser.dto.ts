interface RegisterUserDto {
    name: string
    email: string
    password: string
    address: string
    phone: string
    image?: string | null
}

export default RegisterUserDto;