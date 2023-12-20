import type { LayoutServerLoad } from "./$types";
import { isLoggedIn } from '$lib/functions.js';

export const load: LayoutServerLoad = async (event) => {

  const response = await isLoggedIn(event.cookies.get("access_token") ?? ""); 
  
  const surveySidebarItems = [{
        title: "Overview",
        icon: "teenyicons:pie-chart-solid",
        url: [`/dashboard/surveys/${event.params?.slug}`]
      },
      {
          title: "Feedback",
          icon: "mingcute:document-fill",
          url: [`/dashboard/surveys/${event.params?.slug}/feedback`]
      },
      {
        title: "Home",
        icon: "entypo:back",
        url: [`/dashboard/surveys`]
      }
  ];

  const regularSidebarItems = response.permissions.includes("template:read" && "auth:read") ? [
    {
      title: "General",
      icon: "teenyicons:pie-chart-solid",
      url: ["/dashboard"]
    },
    {
      title: "Surveys",
      icon: "mingcute:document-fill",
      url: ["/dashboard/surveys"]
    },
    {
      title: "eNPS",
      icon: "ion:person",
      url: ["/dashboard/enps"]
    },
    {
      title: "Engagement",
      icon: "iconoir:percentage-square-solid",
      url: ["/dashboard/engagement"]
    },
    {
      title: "Templates",
      icon: "heroicons-solid:template",
      url: ["/dashboard/templates", 
      "/dashboard/builder", 
      `/dashboard/templates/${event.params?.slug}`, 
      `/dashboard/templates/builder/${event.params?.slug}`, 
      `/dashboard/templates/builder`
      ]
    },
    {
      title: "Settings",
      icon: "solar:settings-bold",
      url: ["/dashboard/settings", "/dashboard/settings/add"]
    },
  ] : [
    {
      title: "General",
      icon: "teenyicons:pie-chart-solid",
      url: ["/dashboard"]
    },
    {
      title: "Surveys",
      icon: "mingcute:document-fill",
      url: ["/dashboard/surveys"]
    },
    {
      title: "eNPS",
      icon: "ion:person",
      url: ["/dashboard/enps"]
    }
  ];


  return {
    pathname: event.url.pathname,
    side: event.url.pathname.includes(`/dashboard/surveys/${event.params?.slug}`) ? surveySidebarItems : regularSidebarItems,
    slug: event.params?.slug,
    cookie: event.cookies.get("access_token"),
    permissions: response.permissions,
    filterUser: response.filter 
  };
};

