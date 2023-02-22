import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async () => {

  // TODO - Get data from DB.
  // TODO - Replace Dummy Data Returned.
  return {
    userDetails: {
      name: "Ryan Paranich",
      phone: "555-555-5555",
      email: "ryan@roga.dev",
      avatar: "https://roga.dev/avatar.png",
      created: "2021-01-01",
      emailConfirmed: true
    },
    organizations: [
      {
        id: "1",
        name: "Roga Dev",
        avatar: "https://roga.dev/avatar.png",
        created: "2021-01-01",
        role: "owner"
      }
    ]
  };
};