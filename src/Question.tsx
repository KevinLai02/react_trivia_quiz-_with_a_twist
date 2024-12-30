import React from "react";

export interface QuestionT {
    id: number
    value: string
    section: SectionT
    ans: string
    buttonClick: ({ans, userAns}:{ans: string, userAns: string}) => void
}

interface SectionT {
    a: string
    b: string
    c: string
}

export const Question = (props: QuestionT) => {
    const {id, value, section, ans, buttonClick} = props
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div>第{id}題</div>
            <div style={{display: 'flex', marginTop: '20px'}}>
                Question:
                <div style={{fontWeight: 'bold', marginLeft: '10px'}}>{value}</div>
            </div>
            <div style={{display: 'flex', marginTop: '40px'}}>
                <button 
                    style={{marginLeft: '20px', marginRight: '20px', padding: '5px'}}
                    onClick={()=>{
                        buttonClick({ans, userAns: 'a'})
                    }}
                >
                    (a) {section.a}
                </button>
                <button 
                    style={{marginLeft: '20px', marginRight: '20px', padding: '5px'}}
                    onClick={()=>{
                        buttonClick({ans, userAns: 'b'})
                    }}
                >
                    (b) {section.b}
                </button>
                <button 
                    style={{marginLeft: '20px', marginRight: '20px', padding: '5px'}}
                    onClick={()=>{
                        buttonClick({ans, userAns: 'c'})
                    }}
                >
                    (c) {section.c}
                </button>
            </div>
        </div>
    )
}