"use client"

import { Button } from "@mui/material";

export default function AppButton ({ btnText, styles, variant, color="secondary"}){
  return <Button variant={variant} sx={styles} color={color}>{btnText}</Button>
}