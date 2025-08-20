import path from "path"

export const registerFormControls=[
  {
    name:"username",
    label:"Username",
    type:"text",
    componentType:"input",
    placeholder:"Enter your name"
  },
  {
    name:"email",
    label:"Email",
    type:"email",
    componentType:"input",
    placeholder:"Enter your email"
  },
  {
    name:"password",
    label:"Password",
    type:"password",
    componentType:"input",
    placeholder:"Enter your password"
  }
]
export const loginFormControls=[
   {
    name:"email",
    label:"Email",
    type:"email",
    componentType:"input",
    placeholder:"Enter your email"
  },
  {
    name:"password",
    label:"Password",
    type:"password",
    componentType:"input",
    placeholder:"Enter your password"
  }
]
export const addProductFormControls=[
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "Men", label: "Men" },
      { id: "Women", label: "Women" },
      { id: "Kids", label: "Kids" },
      { id: "Accessories", label: "Accessories" },
      { id: "Footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "Nike", label: "Nike" },
      { id: "Adidas", label: "Adidas" },
      { id: "Puma", label: "Puma" },
      { id: "Levi's", label: "Levi's" },
      { id: "Zara", label: "Zara" },
      { id: "H&M", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
]
export const shoppingHeaderNavItems=[
  {
    id:'Home',
    label:"Home",
    path:"/shop/home"
  },
  {
    id:"Products",
    label:"Products",
    path:"/shop/products"
  },
  {
    id:'Men',
    label:"Men",
    path:"/shop/products"
  },
  {
    id:'Women',
    label:"Women",
    path:"/shop/products"
  },
  {
    id:"Kids",
    label:"Kids",
    path:"/shop/products"
  },
  {
    id:"Footwear",
    label:"Footwear",
    path:"/shop/products"
  },
  {
    id:"Accessories",
    label:"Accessories",
    path:"/shop/products"
  },
  {
    id:"Search",
    label:"Search",
    path:"/shop/search"
  }
]
export const shopFilterProducts={
  category:[
    {id:'Men',label:'Men'},
    {id:'Women',label:'Women'},
    { id: "Kids", label: "Kids" },
    { id: "Accessories", label: "Accessories" },
    { id: "Footwear", label: "Footwear" },
  ],
  brand:[
     { id: "Nike", label: "Nike" },
      { id: "Adidas", label: "Adidas" },
      { id: "Puma", label: "Puma" },
      { id: "Levi's", label: "Levi's" },
      { id: "Zara", label: "Zara" },
      { id: "H&M", label: "H&M" },
  ]
  

  
}
export const shopSortOptions=[
  {
    id:"price:lowtohigh",
    label:"Price:Low to High"
  },
  {
    id:"price:hightolow",
    label:"Price:High to Low"
  },
  {
    id:"title:atoz",
    label:"Title:A to Z"
  },
  {
    id:"title:ztoa",
    label:"Title:Z to A"
  }
]
export const category=[
   {id:'Men',label:'Men',src:"https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {id:'Women',label:'Women',src:"https://images.unsplash.com/photo-1590330297626-d7aff25a0431?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    { id: "Kids", label: "Kids",src:"https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: "Accessories", label: "Accessories" ,src:"https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    { id: "Footwear", label: "Footwear",src:"https://plus.unsplash.com/premium_photo-1664202526744-516d0dd22932?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
]
export const brand=[
  { id: "Nike", label: "Nike",src:"https://static.vecteezy.com/system/resources/thumbnails/010/994/232/small_2x/nike-logo-black-clothes-design-icon-abstract-football-illustration-with-white-background-free-vector.jpg" },
      { id: "Adidas", label: "Adidas" ,src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLJC-hmcfN9t5pvZRmFrTBktTfr4lpdWKTA&s"},
      { id: "Puma", label: "Puma",src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz9NIEURuTUzfqhx7zBrIavITXO36FcqYQ9w&s" },
      { id: "Levi's", label: "Levi's",src:"https://static.vecteezy.com/system/resources/previews/023/870/369/non_2x/levis-logo-brand-symbol-black-design-clothes-fashion-illustration-free-vector.jpg" },
      { id: "Zara", label: "Zara" ,src:"https://logomakerr.ai/blog/wp-content/uploads/2022/08/2019-to-Present-Zara-logo-design.jpg"},
      { id: "H&M", label: "H&M" ,src:"https://static.vecteezy.com/system/resources/previews/023/871/762/non_2x/hm-brand-logo-symbol-black-design-hennes-and-mauritz-clothes-fashion-illustration-free-vector.jpg"}
]
export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "State",
    name: "state",
    componentType: "input",
    type: "text",
    placeholder: "Enter your state",
  },
  {
    label: "Pincode",
    name: "pinCode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phNumber",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];