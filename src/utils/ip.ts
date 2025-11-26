/**
 * Récupère l'adresse IP publique de l'utilisateur
 * Utilise un service externe gratuit (ipify) pour obtenir l'IP
 * @returns Promise<string> L'adresse IP de l'utilisateur ou une chaîne vide en cas d'erreur
 */
export async function getUserIpAddress(): Promise<string> {
  try {
    // Utilisation d'un service externe gratuit pour récupérer l'IP publique
    const response = await fetch('https://api.ipify.org?format=json', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn('Impossible de récupérer l\'adresse IP depuis ipify');
      return '';
    }

    const data = await response.json();
    return data.ip || '';
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'adresse IP:', error);
    return '';
  }
}

