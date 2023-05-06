import {
  Modal as ChakraModal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useModal } from "../../hooks/useModal";

export function Modal() {
  const { component, isOpen, closeModal } = useModal();

  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={closeModal}
      blockScrollOnMount
      closeOnOverlayClick
    >
      <ModalOverlay />
      <ModalContent
        marginTop={{ base: "50px", md: "220px" }}
        minWidth="300px"
        minHeight="200px"
        backgroundColor="black.900"
      >
        <ModalCloseButton />
        <ModalBody padding="16px">{component}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
}
