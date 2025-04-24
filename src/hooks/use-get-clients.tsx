// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "../../utils/supabase/client";

// const getClients = async () => {
//   const { data: clients, error } = await supabase.from("clients").select("*");

//   if (error) {
//     console.error("Error fetching clients:", error);
//     return null;
//   }
//   console.log("CLIENTS", clients);
//   return clients;
// };

// export const useGetClients = () =>
//   useQuery({
//     queryKey: ["clients", "all"],
//     queryFn: getClients,
//   });
