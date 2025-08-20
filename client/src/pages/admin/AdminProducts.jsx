import AdminProductTile from "@/components/Admin/AdminProductTile";
import ImageUploader from "@/components/Admin/ImageUploader";
import FormControl from "@/components/common/FormControl";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { addProductFormControls } from "@/config";
import { addProduct, fetchProducts, updateProduct } from "@/store/slices/product.slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [secureUrl, setSecureUrl] = useState("");
  
  const[editId,setEditId]=useState("")
  const dispatch = useDispatch();
  const initialstate = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  };
  const [productFormdata, setProductFormData] = useState(initialstate);
  const { products } = useSelector((state) => state.products);
  console.log(products);
  const onSubmit = (e) => {
    e.preventDefault();
    if (imageFile && !secureUrl) {
    toast("Please wait for the image to finish uploading.");
    return;
  }
    const imageToUse = imageFile ? secureUrl : productFormdata.image;
  if (editId) {
  dispatch(updateProduct({
    id: editId,
    formData: { ...productFormdata, image: imageToUse }
  })).then((res) => {
    if (res?.payload?.success) {
      dispatch(fetchProducts());
      setOpen(false);
      setProductFormData(initialstate);
      setImageFile(null);
      setEditId(""); // Clear
      toast(res?.payload?.message);
    }
  });
} else {
  dispatch(addProduct({ ...productFormdata, image: secureUrl })).then((res) => {
    if (res?.payload?.success) {
      toast(res?.payload?.message);
      setOpen(false);
      setImageFile(null);
      setProductFormData(initialstate);
      dispatch(fetchProducts());
    }
  });
}

}

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
 console.log(editId)
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setOpen(true)}
          className="px-6 py-2 bg-black text-white rounded-md shadow hover:bg-gray-950 transition"
        >
          Add Product
        </button>
      </div>

      <Sheet open={open} onOpenChange={(isOpen)=>{
        setOpen(isOpen)
        if(!isOpen)
        {
          setProductFormData(initialstate);
          
         
          setEditId("")
          setImageFile(null);     // 🆕 clear uploaded file
      setSecureUrl("");  
        }
      }}>
        <SheetContent
          side="right"
          className="w-full max-w-md p-6 space-y-6 overflow-y-auto max-h-screen"
        >
          <SheetTitle className="text-xl font-semibold text-gray-800">
            {!editId?"Add Product":"Update Product"}
          </SheetTitle>
          <ImageUploader
            imageFile={imageFile}
            setImageFile={setImageFile}
            secureUrl={secureUrl}
            setSecureUrl={setSecureUrl}
          />
          <FormControl
            formControls={addProductFormControls}
            formData={productFormdata}
            setFormData={setProductFormData}
            buttonText={editId?"Edit":"Add"}
            onSubmit={onSubmit}
            isBtnDisabled={false}
           
          />
        </SheetContent>
      </Sheet>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <AdminProductTile key={product._id} product={product} open={open} setOpen={setOpen} editId={editId} setEditId={setEditId} setProductFormData={setProductFormData} />
        ))}
      </div>
    </div>
  );
};

export default Products;
