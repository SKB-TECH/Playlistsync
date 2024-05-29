import process from "process";

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

export const data = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        fullName: 'Aafreen Khan',
        timeStamp: '12:47 PM',
        recentText: 'Good Day!',
        avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        fullName: 'Sujitha Mathur',
        timeStamp: '11:11 PM',
        recentText: 'Cheer up, there!',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        fullName: 'Anci Barroco',
        timeStamp: '6:22 PM',
        recentText: 'Good Day!',
        avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
    },
    {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        fullName: 'Aniket Kumar',
        timeStamp: '8:56 PM',
        recentText: 'All the best',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
    },
    {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        fullName: 'Kiara',
        timeStamp: '12:47 PM',
        recentText: 'I will call today.',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
    },
    {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        fullName: 'Aniket Kumar',
        timeStamp: '8:56 PM',
        recentText: 'All the best',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
    },
    {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        fullName: 'Kiara',
        timeStamp: '12:47 PM',
        recentText: 'I will call today.',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
    },
    {
        id: '68694a0f-3da1-431f-bd56-142371e29d72',
        fullName: 'Aniket Kumar',
        timeStamp: '8:56 PM',
        recentText: 'All the best',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
    },
    {
        id: '28694a0f-3da1-471f-bd96-142456e29d72',
        fullName: 'Kiara',
        timeStamp: '12:47 PM',
        recentText: 'I will call today.',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
    },
];