"use client";
import axios from "axios";
import * as z from "zod";
import Heading from "@/components/heading";
import { Download, MessageSquare } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import Empty from "@/components/empty";
import Loader from "@/components/Loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { amountOptions,
   formSchema, 
   resolutionOptions 
  } from "./constants";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";


const ImageGeneration = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512"
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
   setImages([]);

      const response = await axios.post("/api/imagegeneration", values);

      const urls = response.data.map((image: { url: string }) => image.url)

      setImages(urls);

      form.reset();
    } catch (error: any) {
      // TODO: Open Pro Model
      console.error("Error:", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Transform your ideas into stunning visuals effortlessly with AI-driven image generation."
        icon={MessageSquare}
        iconColor="text-sky-500"
        bgColor="bg-sky-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Generate Images..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                     <Select disabled={isLoading}  
                     onValueChange={field.onChange}
                     value={field.value}
                     defaultValue={field.value}
                     >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem 
                        key={option.value}
                        value={option.value}
                        >
                         {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                     </Select>
                </FormItem>
              )}
              />
                <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                     <Select disabled={isLoading}  
                     onValueChange={field.onChange}
                     value={field.value}
                     defaultValue={field.value}
                     >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem 
                        key={option.value}
                        value={option.value}
                        >
                         {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                     </Select>
                </FormItem>
              )}
              />
              
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label={"No image generated."} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src) => (
              <Card 
              key={src}
              className="rounded-lg overflow-hidden"
              >
                 <div className="relative aspect-square">
                   <Image src={"src"} alt={"image"} fill />
                 </div>
                 <CardFooter className="p-2 ">
                         {/* <Button
                         onClick={() => window.open(src)}
                          variant={"secondary"} 
                          className="w-full" 
                          >
                         <Download className="h-4 w-4 mr-2"/>
                         Download
                         </Button> */}
                             <Button
                              onClick={() => {
                             const link = document.createElement("a");
                            link.href = src;
                             link.download = "image.png"; // You can change the default file name
                             document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                             }}
                             variant={"secondary"}
                              className="w-full"
                           >
                          <Download className="h-4 w-4 mr-2" />
                         Download
                      </Button>
                 </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneration;



















































































































































// "use client";
// import axios from "axios";
// import * as z from "zod";
// import Heading from "@/components/heading";
// import { Download, MessageSquare } from "lucide-react";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// import Empty from "@/components/empty";
// import Loader from "@/components/Loader";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { amountOptions, formSchema, resolutionOptions } from "./constants";
// import { Card, CardFooter } from "@/components/ui/card";
// import Image from "next/image";

// const ImageGeneration = () => {
//   const router = useRouter();
//   const [images, setImages] = useState<string[]>([]);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       prompt: "",
//       amount: "1",
//       resolution: "512x512"
//     },
//   });

//   const isLoading = form.formState.isSubmitting;

//   // Handle form submission to generate images
//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       setImages([]); // Clear previous images before new request

//       const response = await axios.post("/api/imagegeneration", values);

//       // Check if the response has valid data before setting it
//       if (response.data && Array.isArray(response.data)) {
//         const urls = response.data.map((image: { url: string }) => image.url); // Ensure API returns 'url'
//         setImages(urls);
//       } else {
//         console.error("Invalid response data:", response.data);
//       }

//       form.reset();
//     } catch (error: any) {
//       console.error("Error:", error);
//     } finally {
//       router.refresh();
//     }
//   };

//   return (
//     <div>
//       <Heading
//         title="Image Generation"
//         description="Transform your ideas into stunning visuals effortlessly with AI-driven image generation."
//         icon={MessageSquare}
//         iconColor="text-sky-500"
//         bgColor="bg-sky-500/10"
//       />
//       <div className="px-4 lg:px-8">
//         <div>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
//             >
//               <FormField
//                 name="prompt"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-6">
//                     <FormControl className="m-0 p-0">
//                       <Input
//                         className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
//                         disabled={isLoading}
//                         placeholder="Generate Images..."
//                         {...field}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="amount"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-2">
//                     <Select
//                       disabled={isLoading}
//                       onValueChange={field.onChange}
//                       value={field.value}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue defaultValue={field.value} />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {amountOptions.map((option) => (
//                           <SelectItem key={option.value} value={option.value}>
//                             {option.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="resolution"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-2">
//                     <Select
//                       disabled={isLoading}
//                       onValueChange={field.onChange}
//                       value={field.value}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue defaultValue={field.value} />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {resolutionOptions.map((option) => (
//                           <SelectItem key={option.value} value={option.value}>
//                             {option.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormItem>
//                 )}
//               />
//               <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
//                 Generate
//               </Button>
//             </form>
//           </Form>
//         </div>
//         <div className="space-y-4 mt-4">
//           {isLoading && (
//             <div className="p-20">
//               <Loader />
//             </div>
//           )}
//           {images.length === 0 && !isLoading && <Empty label={"No images generated."} />}

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
//             {images.map((src) => (
//               <Card key={src} className="rounded-lg overflow-hidden">
//                 <div className="relative aspect-square">
//                   <Image src={src} alt="Generated image" fill />
//                 </div>
//                 <CardFooter className="p-2">
//                   <Button
//                     onClick={() => {
//                       const link = document.createElement("a");
//                       link.href = src;
//                       link.download = "image.png"; // Customize the file name if needed
//                       document.body.appendChild(link);
//                       link.click();
//                       document.body.removeChild(link);
//                     }}
//                     variant={"secondary"}
//                     className="w-full"
//                   >
//                     <Download className="h-4 w-4 mr-2" />
//                     Download
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageGeneration;





























