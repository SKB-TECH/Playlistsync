//@ts-nocheck

"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/settings/store";
import QrCode from "qrcode";
import Image from "next/image";
import { Divider, useToast } from "@chakra-ui/react";
import {
  FacebookIcon,
  FacebookShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { MdContentCopy } from "react-icons/md";
import { useTheme } from "next-themes";
import { COLORS } from "@/utils";
import {getData} from "@/storage";

const Share = () => {
  const { sessionData, sessionDetail } = useSelector(
    (state: RootState) => state.session
  );
  const [code, setCode] = useState("");
  const toast = useToast();
  const { setTheme, resolvedTheme } = useTheme();

  const shareElement =
    typeof window !== "undefined" &&
    window.location.host +
      `/join/${sessionDetail?.data?.accessCode || sessionData?.accessCode}`;
  const title = "Play List Sync";

  const generateCode = () => {
    // @ts-ignore
    QrCode.toDataURL(`${shareElement}`).then((data: any) => {
      setCode(data);
    });
  };

  const CopyPast = async () => {
    try {
      await navigator.clipboard.writeText(sessionDetail?.data?.accessCode || sessionData?.accessCode||getData("sessionDetail")?.accessCode);
      toast({
        title: "Code copié avec succès !",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erreur de copy!",
        description: err.toString(),
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    generateCode();
  });
  // @ts-ignore
  return (
    <section
      className={
        "w-full min-h-[200px] flex flex-col items-center justify-start bg-light-m dark:bg-dark-m gap-5"
      }
    >
      <h2 className={"dark:text-gray-300 text-black/50"}>
        Partager cette session avec tes amis
      </h2>
      <div className={"w-44 h-44 rounded-lg  shadow-md"}>
        <Image
          src={code}
          alt={"code qr"}
          className={"w-full h-full rounded-lg"}
          width={400}
          height={400}
        />
      </div>
      <Divider />
      <h2 className={"dark:text-gray-300 text-black/50"}>
        Partager Aussi dans vos réseaux sociaux:
      </h2>
      <div
        className={
          "flex flex-row flex-wrap gap-3 justify-start items-center px-4 "
        }
      >
        <FacebookShareButton
          url={shareElement}
          title={title}
          appId={202567}
          htmlTitle={"Facebook"}
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TelegramShareButton
          url={shareElement}
          title={title}
          appId={202567}
          htmlTitle={"Telegram"}
        >
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>
        <FacebookMessengerShareButton
          url={shareElement}
          title={title}
          appId={202567}
          htmlTitle={"Messenger"}
        >
          <FacebookMessengerIcon size={32} round={true} />
        </FacebookMessengerShareButton>
        <WhatsappShareButton
          url={shareElement}
          title={title}
          appId={202567}
          htmlTitle={"Whatssap"}
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <LinkedinShareButton
          url={shareElement}
          title={title}
          appId={202567}
          htmlTitle={"Linkedin"}
        >
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <TwitterShareButton
          url={shareElement}
          title={title}
          appId={202567}
          htmlTitle={"Twitter"}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </div>
      <Divider />
      <div className={"flex flex-col gap-2 p-2"}>
        <h2 className={"dark:text-gray-300 text-black/50"}>
          Code Référence de la session :
        </h2>
        <div
          className={"flex items-center gap-5 dark:text-gray-300 text-black/50"}
        >
          <h1>{sessionData?.accessCode}</h1>
          <MdContentCopy
            size={25}
            color={`${resolvedTheme == "dark" ? COLORS.rose01 : COLORS.bleu01}`}
            className={"hover:cursor-pointer"}
            onClick={CopyPast}
          />
        </div>
      </div>
    </section>
  );
};

export default Share;
