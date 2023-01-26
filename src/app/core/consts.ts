import { ELocalities } from "./enums/localities.enum";

export const mapLocalitiesName = {
  [ELocalities.BELO_HORIZONTE]: "Belo Horizonte",
  [ELocalities.MONTEVIDEO]: "Montevidéu",
};

export const mapLocalitiesInitials = {
  [ELocalities.BELO_HORIZONTE]: "BH",
  [ELocalities.MONTEVIDEO]: "MV",
};

const COLORS = [
  "#4dc9f6",
  "#f67019",
  "#f53794",
  "#537bc4",
  "#acc236",
  "#166a8f",
  "#00a950",
  "#58595b",
  "#8549ba",
];

export function color(index) {
  return COLORS[index % COLORS.length];
}

export const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

export const months: { month: string; value: string }[] = [
  { month: "Fevereiro", value: "02" },
  { month: "Março", value: "03" },
  { month: "Abril", value: "04" },
  { month: "Maio", value: "05" },
  { month: "Junho", value: "06" },
  { month: "Julho", value: "07" },
  { month: "Agosto", value: "08" },
  { month: "Setembro", value: "09" },
];
