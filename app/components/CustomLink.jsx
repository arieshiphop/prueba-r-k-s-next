'use client'
import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";
import { isLoading } from "@/store/isLoading.store";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default function CustomLink({ href, children }) {
  const loadingStore = isLoading.getInstance();

  const handleClick = () => {
    loadingStore.setLoading(true);
  };

  useEffect(() => {
    return () => {
      loadingStore.setLoading(false);
    };
  });

  return (
    <StyledLink href={href} onClick={handleClick}>
      {children}
    </StyledLink>
  );
}
