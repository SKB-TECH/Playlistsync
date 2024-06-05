import process from "process";
import axios from "axios";
export const validerMotDePasse = (motDePasse: string) => {
    // Expression régulière pour exiger au moins 8 caractères, une majuscule, une minuscule et un chiffre
    const regexMotDePasse = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    // Vérifier si le mot de passe correspond à l'expression régulière
    return regexMotDePasse.test(motDePasse);
};

const URL_API = String(process.env.NEXT_PUBLIC_API_URL);
const CLE_SITE = String(process.env.NEXT_PUBLIC_CLE_SITE);
const CLE_SEC = String(process.env.NEXT_PUBLIC_CLE_SEC);

export {
    URL_API,
    CLE_SITE,
    CLE_SEC
}

export const COLORS={
    "rose01":"#f200ab",
    "rose02":"#ff86f7",
    "bleu01":"#03aafc",
    "bleu02":"#07c5f4",
    "vert01":"#88f744",
    "vert02":"#13d763",
    "dark-m":"#181a2a",
    "light-m":"#F7F7F7",
}
export const darkColors = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600', '#355c7d', '#6c5b7b', '#c06c84', '#f67280', '#f8b195', '#6a2c70', '#b83b5e', '#f08a5d', '#bdc3c7', '#34495e', '#2c3e50', '#22313f'];

export const dataUser = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        pseudo: 'Aafreen Khan',

    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        pseudo: 'Sujitha Mathur',

    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        pseudo: 'Anci Barroco',

    },
    {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        pseudo: 'Aniket Kumar',

    },
    {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        pseudo: 'Kiara',

    },
    {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        pseudo: 'Aniket Kumar',

    },
    {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        pseudo: 'Kiara Kinyamba',

    },
    {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        pseudo: 'Aniket Kumar amani',

    },
    {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        pseudo: 'Kiara',

    },
    {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        pseudo: 'Aniket Kumar',

    },
    {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        pseudo: 'Kiara',

    },
    {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        pseudo: 'Aniket Kumar',

    },
    {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        pseudo: 'Kiara Kinyamba',

    },
    {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        pseudo: 'Aniket Kumar amani',

    },
    {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        pseudo: 'Kiara',

    },
    {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        pseudo: 'Aniket Kumar',

    },
    {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        pseudo: 'Kiara',

    },
    {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        pseudo: 'Aniket Kumar',

    },
    {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        pseudo: 'Kiara Kinyamba',

    },
    {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        pseudo: 'Aniket Kumar amani',

    },
    {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        pseudo: 'Kiara',

    },
    {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        pseudo: 'Richard Faillancier',

    },
];


//extraire l'id de la video
export function extractVideoId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11) ? match[2] : null;
}

// lire l'url youtub
export const infoArtist =async(url: string) => {
    const apiKeyA = 'AIzaSyCscZhQmb5esZGkOPgkvWRR5FFYRnT4RO4'
    const videoId = extractVideoId(url);
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    id: videoId,
                    key: apiKeyA,
                },
            });
            return response.data.items[0];
        } catch (error) {
            console.error('Error fetching video info:', error);
            return null;
        }
}