import { v4 as uuidv4 } from "uuid";

function chillHop() {
    return [
        {
            name: "Creswick",
            cover: "https://chillhop.com/wp-content/uploads/2020/10/23fdd99adc3e16abcb67b004ea3e748ebf433a49-1024x1024.jpg",
            artist: "Aviino",
            audio: "https://mp3.chillhop.com/serve.php/?mp3=10454",
            color: [],
            id: uuidv4(),
            active: false,
        },
        {
            name: "Butterfly",
            cover: "https://chillhop.com/wp-content/uploads/2020/09/c209a7df7b9bc133dfff73ce86ebc3c57c2b73dd-1024x1024.jpg",
            artist: "Sleepy Fish",
            audio: "https://mp3.chillhop.com/serve.php/?mp3=10021",
            color: ["#50A8C0", "#814237"],
            id: uuidv4(),
            active: false,
        },
    ]
}

export default chillHop;