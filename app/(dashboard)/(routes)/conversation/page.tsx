"use client";
import axios from "axios";
import * as z from "zod";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionUserMessageParam } from "openai/resources/index.mjs";
import Empty from "@/components/empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionUserMessageParam[]>([]);

  // Load messages from localStorage when the component mounts
  useEffect(() => {
    const savedMessages = localStorage.getItem("conversationMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem("conversationMessages", JSON.stringify(messages));
  }, [messages]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionUserMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);
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
        title="Conversation"
        description="Experience Our Most Advanced Conversational AI Technology."
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
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Write Something..."
                        {...field}
                      />
                    </FormControl>
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
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label={"No Conversation started."} />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-[#121212] text-white"
                )}
                key={index}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-md">
                  {typeof message.content === "string" ? message.content : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;








































// "use client";
// import axios from "axios";
// import * as z from "zod";
// import Heading from '@/components/heading';
// import { MessageSquare } from 'lucide-react';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { formSchema } from "./constants";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import Empty from "@/components/empty";
// import Loader from "@/components/Loader";
// import { cn } from "@/lib/utils";
// import UserAvatar from "@/components/user-avatar";
// import BotAvatar from "@/components/bot-avatar";

// const ConversationPage = () => {
//   const router = useRouter();
//   const [messages, setMessages] = useState<any[]>([]); 

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       prompt: ""
//     }
//   });

//   const isLoading = form.formState.isSubmitting;
//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const userMessage = {
//         role: "user",
//         content: values.prompt,
//       };
//       const newMessages = [...messages, userMessage];
  
//       const response = await axios.post("/api/conversation", {
//         messages: newMessages,
//       });
  
//       setMessages((current) => [...current, userMessage, response.data]);
//       form.reset();
//     } catch (error: any) {
//       // Log all details of the error
//       console.error("Full API Error Object:", error);
  
//       // Extract meaningful error message
//       const errorMessage =
//         error.response?.data?.error || error.message || "Unknown error occurred.";
//       alert(errorMessage); // Show this to the user
//     } finally {
//       router.refresh();
//     }
//   };
//   return (
//     <div>
//       <Heading
//         title='Conversation'
//         description='Experience Our Most Advanced Conversational AI Technology.'
//         icon={MessageSquare}
//         iconColor='text-sky-500'
//         bgColor='bg-sky-500/10'
//       />
//       <div className='px-4 lg:px-8'>
//         <div>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
//               <FormField name="prompt" render={({ field }) => (
//                 <FormItem className="col-span-12 lg:col-span-10">
//                   <FormControl className="m-0 p-0">
//                     <Input
//                       className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
//                       disabled={isLoading}
//                       placeholder="Write Something..."
//                       {...field}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )} />
//               <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
//                 Generate
//               </Button>
//             </form>
//           </Form>
//         </div>

//         <div className="space-y-4 mt-4">
//           {isLoading && (
//             <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
//               <Loader />
//             </div>
//           )}
//           {messages.length === 0 && !isLoading && (
//             <Empty label={"No Conversation started."} />
//           )}

//           <div className="flex flex-col-reverse gap-y-4">
//             {messages.map((message, index) => (
//               <div
//                 className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}
//                 key={index}
//               >
//                 {message.role === "user" ? <UserAvatar /> : <BotAvatar />}

//                 <p className="text-sm">
//                   {Array.isArray(message.content)
//                     ? message.content.map((part: { text?: string; url?: string; } | null, i: React.Key | null | undefined) => {
//                         if (part?.text) {
//                           return <span key={i}>{part.text}</span>;
//                         } else if (part?.url) {
//                           return <img key={i} src={part.url} alt="Generated Content" />;
//                         }
//                         return null;
//                       })
//                     : typeof message.content === "string"
//                     ? message.content
//                     : null}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConversationPage;
