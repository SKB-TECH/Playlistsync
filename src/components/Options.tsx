import React from 'react';
import {Checkbox, Editable, EditableInput, EditablePreview} from "@chakra-ui/react";
import {COLORS} from "@/utils";

const Options = () => {
    return (
        <section className={"W-full gap-5 flex flex-col items-center"}>
            <div className={"w-full flex  justify-between"}>
                <label className={"text-tbleu01 text-md "}>Nombre des Micros</label>
                <Editable defaultValue='10' width={10} height={10} borderColor={"blue"} color={COLORS.bleu01}
                          alignItems={"center"} textAlign={"end"}>
                    <EditablePreview/>
                    <EditableInput type={"number"}/>
                </Editable>
            </div>
            <div className={"w-full flex  justify-between"}>
                <label className={"text-tbleu01 text-md "}>Indiquer qui a ajouter Url </label>
                <Checkbox size={"lg"} className={"-ml-20"} borderColor={COLORS.bleu01}/>
            </div>

            <div className={"w-full flex  justify-between"}>
                <label className={"text-tbleu01 text-md "}>Avertir le prochain Intervenant </label>
                <Checkbox size={"lg"} className={"-ml-20"} borderColor={COLORS.bleu01}/>
            </div>

            <div className={"w-full flex  justify-between"}>
                <label className={"text-tbleu01 text-md "}>{'Permettre Auto-Ajout "Ajoute moi""'}</label>
                <Checkbox size={"lg"} className={"-ml-20"} borderColor={COLORS.bleu01}/>
            </div>
        </section>
    );
};


export default Options;