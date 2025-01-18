import * as z from "zod";

export const formSchema = z.object({

    prompt: z.string().min(1, {
        message: "Image Prompt is required"
    }),
    amount: z.string().min(1),
    resolution: z.string().min(1)

});


export const amountOptions = [
    {
        value: "1",
        label: "1 Image"
    },
    {
        value: "2",
        label: "2 Images"
    },
    {
        value: "3",
        label: "3 Images"
    },
    {
        value: "4",
        label: "4 Images"
    },
    {
        value: "5",
        label: "5 Images"
    }
];


export const resolutionOptions = [
    {
        value:"512x512",
        label:"1:1"
    },
    {
        value:"1080x720",
        label:"3:2"
    },
    {
        value:"720x1080",
        label:"2:3"
    },
    {
        value:"1536x512",
        label:"3:1"
    },
    {
        value:"1280x720",
        label:"16:9"
    },
    {
        value:"720x1280",
        label:"9:16"
    }
    ,
    {
        value:"768x1232",
        label:"10:16"
    },
    {
        value:"1232x768",
        label:"16:10"
    }
];