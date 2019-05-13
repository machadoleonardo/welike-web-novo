
export const getTipo = (pathname, routes) => {
    if (pathname === routes.FILA_MEUS.path) return 'MEUS';
    if (pathname === routes.FILA_OUTROS.path) return 'OUTROS';    
    return '';
}