import React, { useEffect } from "react";
import { useState } from "react";
import Styles from "./Chat.module.css";
import { connect, sendMsg } from "../../api";

interface Smile {
    name: string;
    width: string;
    height: string;
}

export const Chat = () => {
    const [messages, setMessgae] = useState<string[]>([]);
    const [value, setValue] = useState<string | string[] | any>("");
    const [nick, setNickname] = useState<string>("USER");
    const [smile, setSmile] = useState<boolean>(false);

    const [smiles] = useState<Smile[]>([
        {
            name: "yes",
            width: '20',
            height: '20',

        },
        {
            name: "ahtung",
            width: "30",
            height: "20",
        },
        {
            name: "gent",
            width: '20',
            height: '20',
        },
        {
            name: "conf",
            width: '20',
            height: '20'
        },
        {
            name: "doctor",
            width: "40",
            height: "35",
        },
        {
            name: "privet",
            width: '35',
            height: '35',
        },
        {
            name: "hello",
            width: '35',
            height: '35',
        },
        {
            name: "congr",
            width: "55",
            height: "40"
        },
        {
            name: "newyear",
            width: "55",
            height: "40",
        },
        {
            name: "old",
            width: "40",
            height: "30",
        },
        {
            name: "wall",
            width: '35',
            height: "30"
        },
        {
            name: "friday",
            width: '75',
            height: "35"
        }
    ])


    const send = (v: string | any) => {
        if (v === "" || nick === "") return
        setValue("")
        sendMsg(`${nick + ":"} ${v}`);
    };

    connect((msg: any) => {
        setMessgae([...messages, JSON.parse(msg.data)]);
    });

    useEffect(() => {
        setInterval(() => {
            window.location.reload()
        }, 200000)
    }, [])

    function findSmile(name:string, param: string) {
        var obj: any = smiles.find((e: Smile) => e.name === name)
        return obj[param]
    }

    return (
        <div className={Styles.chatBlock}>
            <ul>
                {messages.map((msg: any, i: number) => {
                    var m = msg.Body.split("$")
                    
                    return <li key={i}>{m.map((el: string) => smiles.find((elem: Smile) => elem.name === el) ? 
                        <img key={el} width={findSmile(el,'width')} height={findSmile(el,'height')} src={require(`../Smile/${findSmile(el,'name')}.gif`)} 
                        className={Styles.imgSmileText}
                        /> : el)}</li>
                }
                    
                )}
            </ul>
            <div className={Styles.inputBox}>
                <div className={Styles.sendMessage}>
                    <input
                        onChange={(e) => setNickname(e.target.value)}
                        value={nick}
                        type="text" className={Styles.nicknameValue} />
                    <textarea
                        id="text"
                        value={value}
                        className={Styles.inputMessage}
                        onChange={(e) => setValue(e.target.value)}
                    >{value as string}</textarea>
                    <div style={{display: "flex"}}>
                        <button
                            className={Styles.btnSend}
                            onClick={() => {
                                send(value)
                            }}>SEND
                        </button>
                        <button className={Styles.btnSmile}
                            onClick={() => setSmile(!smile)}
                        >SMILE</button>
                    </div>
                </div>
                <div className={Styles.smileBox}>
                    {smile && <div className={Styles.smileView}>
                            {smiles.map((obj, i) => <img key={i} width={obj.width} height={obj.height} src={require(`../Smile/${obj.name}.gif`)} 
                                                        className={Styles.imgSmile}
                                                        onClick={() => setValue(`${value} $${obj.name}$ `)}
                                                        />)}
                        </div>}
                </div>

            </div>
        </div>
    );
};
