import { useAddresses } from "../hooks/address.hook";
import type { CreateAddressInputType } from "../schemas/address.schema";
import AddressForm from "./AddressForm";

interface CreateAddressProps {
  onSuccess: () => void;
}

const CreateAddress = ({ onSuccess }: CreateAddressProps) => {
  const { createAddress } = useAddresses();

  const handleCreate = async (values: CreateAddressInputType) => {
    await createAddress(values);
    onSuccess();
  };

  return <AddressForm onSubmit={handleCreate} isUpdate={false} />;
};

export default CreateAddress;
