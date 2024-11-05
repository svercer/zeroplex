export const isAdmin = (user) => {
    return user.roles.find(role => role.name === 'admin')
}
