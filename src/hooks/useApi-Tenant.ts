export function useApiTenant() {
  return {
    login: async (email: string, password: string): Promise<{ error: string, token?: string }> => {
      return new Promise(resolve => {
        setTimeout(() => {
          if (email !== 'adminTenant@admin.com') {
            return resolve({
              error: 'E-mail e/ou senha estão errados.'
            });
          }

          return resolve({
            error: '',
            token: 'adminTenantLogged123',
          })
        }, 1000)
      })
    },
    forgotPassword: async (email: string): Promise<{ error: string }> => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ error: '' })
        }, 1000)
      })
    },
  }
}
