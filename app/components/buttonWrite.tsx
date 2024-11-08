"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState, useRef } from "react";

const ButtonWrite: React.FC = () => {
  return (
    <>
      <div>
        <Button
          className="ml-6 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-900 transition-colors duration-200"
        >
          ЗАПИСАТЬСЯ
        </Button>
      </div>
    </>
  );
};

export default ButtonWrite;
