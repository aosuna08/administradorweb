// dwfwgazbv
// Configuración de Cloudinary
export const cloudinaryConfig = {
    cloudName: 'dwfwgazbv',
    uploadPreset: 'automoviles',
    sources: ['local'],
    multiple: false,
    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    maxFileSize: 5000000, // 5MB
    styles: {
        palette: {
            window: '#FFFFFF',
            windowBorder: '#90A0B3',
            tabIcon: '#0078FF',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#FF620C',
            inactiveTabIcon: '#0E2F5A',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#E4EBF1'
        },
        fonts: {
            default: null,
            '"Fira Sans", sans-serif': {
                url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
                active: true
            }
        }
    }
};