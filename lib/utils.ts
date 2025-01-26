import { toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { format, parse } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FETCH_INTERVAL = 60000 * 10;

export const FORMAT = "yyyy-MM-dd";

export const APP_NAME = "TrainerHub";
export const APP_EMAIL = "trainerhub@gmail.com";

export function formatTime(time: string) {
  const TIME_FORMAT = "HH:mm";
  return format(parse(time, TIME_FORMAT, new Date()), "hh:mm a");
}

export function formatDateTime(date: Date | string) {
  return format(new Date(date), "MM/dd/yyyy hh:mm:ss a");
}

export const formatPricingNumber = (val: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
};

export const generateRandomSKU = () => {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // Random alphanumeric string
  const timestampPart = Date.now().toString().slice(-4); // Last 4 digits of the current timestamp
  return `SKU-${randomPart}-${timestampPart}`; // Combine for a unique SKU
};

export const generateRandomINV = () => {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // Random alphanumeric string
  const timestampPart = Date.now().toString().slice(-4); // Last 4 digits of the current timestamp
  return `INV-${randomPart}-${timestampPart}`; // Combine for a unique SKU
};

export async function handlePostAxios({
  values,
  route,
  handleSuccess,
}: {
  values: any;
  route: string;
  handleSuccess: () => void;
}) {
  toast({
    title: "Please wait!",
    description:
      "Please wait while we process your request! This may take long...",
  });
  await axios
    .post(route, values)
    .then((res) => {
      toast({
        title: "Success!",
        description: res.data,
      });
      handleSuccess();
    })
    .catch((error) => {
      console.log(error);
      toast({
        title: "An error occured!",
        variant: "destructive",
        description: error.request.response,
      });
    });
}

interface IPostAxiosProps {
  values: any;
  url: string;
}
export async function handleAxios({ values, url }: IPostAxiosProps) {
  try {
    toast({
      title: "Please wait...",
      description: "We are currently processing your request!",
    });

    const res = await axios.post(url, values);

    if (res.data?.values && res.data?.msg) {
      toast({
        title: "Success!",
        description: res.data.msg,
      });
      return res.data.values;
    } else {
      toast({
        title: "Success!",
        description: res.data,
      });
      return res.data;
    }
  } catch (e: any) {
    const errorMessage =
      e.response?.data?.message || e.message || "An error occurred";
    toast({
      title: "Error!",
      description: errorMessage,
      variant: "destructive",
    });
    console.error(e);
    throw e;
  }
}

export function capitalizeFirstLetter(word: string): string {
  return word.replace(/^\w/, (c) => c.toUpperCase());
}
