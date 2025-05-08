import { FC, useState } from "react"
import { createUseStyles } from "react-jss"
import { cleaningText } from "./utils/cleanSymbol";
import { splitText } from "./utils/splitText";
import { vocab } from "./data/vocab/vocab";
import { example } from "./data/text/example";
import { replaceTokenByCode } from "./utils/createChar";
import { splitCodedText, replaceCodeByTokenIndex } from "./utils/createChar";
import { summValue } from "./utils/createChar";


const replaceSpaces = (str: string) => str.replace(/\s/g, '_');  

function tokenizator(text: string, searchWord: string, replaceWord: string) {
    const regex = new RegExp(searchWord, 'g');
    return text.replace(regex, replaceWord);
}

let tokens = example.toLocaleLowerCase()
tokens = replaceSpaces(tokens)
for (let i = 0; i < vocab.length; i++) {
    tokens = tokenizator(tokens, vocab[i], replaceTokenByCode(i))
}

console.log(tokens)
console.log(vocab[replaceCodeByTokenIndex("bnnl")])

const useStyles = createUseStyles({
    page: {
        backgroundColor: "#1E1E1E",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    inputBox: {
    },
    input: {
        fontSize: "20px",
        border: "none",
        width: "80%",
        height: "50px",
        margin: "20px",
        paddingLeft: "20px"
    },
    button: {
        fontSize: "20px",
        height: "52px",
        border: "none",
        paddingLeft: "20px",
        paddingRight: "20px",
        backgroundColor: "#909090",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "#d4d4d4",
        },
        "&:active": {
            cursor: "pointer",
            backgroundColor: "#ffffff",
        },
    },
});

export const MainPage: FC = () => {
    const classes = useStyles()
    const [text, setText] = useState("");

    const inputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const postText = () => {
        setText(text.toLowerCase())
        //console.log(JSON.stringify(splitText(cleaningText(text))))
    }

    return (
        <div className={classes.page}>
            <div className={classes.inputBox}>
                <input onInput={inputText} value={text} placeholder="text" className={classes.input} />
                <button onClick={postText} className={classes.button}>Ввод</button>
            </div>
            <p>{text}</p>
        </div>
    )
}

export default MainPage