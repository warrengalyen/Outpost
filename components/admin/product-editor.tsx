"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { TextInputWithLabel } from "../text-input-with-label";
import { Product } from "@/db/schema";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  apiRoutes,
  secondLevelNestedRoutes,
  singleLevelNestedRoutes,
} from "@/lib/routes";
import { createProduct } from "@/lib/apiTypes";
import { toast } from "../ui/use-toast";
import { HeadingAndSubheading } from "./heading-and-subheading";
import { ProductImageUploader } from "./product-image-uploader";
import { ProductImages } from "@/lib/types";

const defaultValues = {
  name: "",
  description: "",
  price: "",
  inventory: "",
  images: [],
};

export const ProductEditor = (props: {
  displayType?: "page" | "modal";
  productStatus: "new-product" | "existing-product";
  initialValues?: Product;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState([] as ProductImages[]);
  const [newImages, setNewImages] = useState([] as ProductImages[]);

  const [formValues, setFormValues] = useState<Omit<Product, "id" | "storeId">>(
    props.initialValues ?? defaultValues
  );

  const dismissModal = useCallback(() => {
    if (props.displayType === "modal") {
      router.back();
    } else {
      router.push(singleLevelNestedRoutes.account.products);
    }
  }, [router, props.displayType]);

  const onKeyDown = useCallback(
    (e: any) => {
      if (e.key === "Escape") dismissModal();
    },
    [dismissModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const handleProductUpdate = async (
    e:
      | FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    buttonAction?: "delete"
  ) => {
    e.preventDefault();
    setIsLoading(true);

    const mutate = async (
      action: "create" | "update" | "delete"
    ): Promise<createProduct["output"]> => {
      const res = await mutateProduct({
        values: formValues,
        action,
        newImages,
        initialValues: props.initialValues as Omit<Product, "images"> & {
          images: ProductImages[];
        },
        imagesToDelete,
      });
      return await res?.json();
    };

    let data;
    if (buttonAction === "delete") {
      data = await mutate("delete");
      if (!data.error) {
        router.push(singleLevelNestedRoutes.account.products);
      }
    } else if (props.initialValues) {
      data = await mutate("update");
    } else {
      data = await mutate("create");
      if (!data.error) {
        router.push(
          `${secondLevelNestedRoutes.product.base}/${data.productId}`
        );
        setFormValues(defaultValues);
      }
    }

    setIsLoading(false);
    toast({
      title: data.message,
      description: data.action,
    });
  };

  return (
    <>
      <HeadingAndSubheading
        heading={
          props.productStatus === "new-product"
            ? "Create a new product"
            : "Edit product"
        }
        subheading={
          props.productStatus === "new-product"
            ? "Enter the details of your new product below and click save."
            : "Edit the details of your product below and click save."
        }
      />

      <form onSubmit={handleProductUpdate}>
        <div className="flex flex-col gap-8 mt-2 mb-6">
          <TextInputWithLabel
            required
            id="name"
            label="Product Name"
            type="text"
            state={formValues}
            setState={setFormValues}
          />
          <TextInputWithLabel
            id="description"
            label="Description"
            type="text"
            inputType="textarea"
            rows={8}
            state={formValues}
            setState={setFormValues}
          />
          {props.productStatus === "existing-product" && (
            <ProductImageUploader
              product={
                props.initialValues as Omit<Product, "images"> & {
                  images: ProductImages[];
                }
              }
              newImages={newImages}
              setNewImages={setNewImages}
              imagesToDelete={imagesToDelete}
              setImagesToDelete={setImagesToDelete}
            />
          )}
          <div className="grid grid-cols-2 gap-4">
            <TextInputWithLabel
              id="price"
              label="Price"
              type="number"
              state={formValues}
              setState={setFormValues}
            />
            <TextInputWithLabel
              id="inventory"
              label="Quantity In Stock"
              type="number"
              state={formValues}
              setState={setFormValues}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          {!!props.initialValues && (
            <Button
              type="button"
              variant="destructiveOutline"
              onClick={(e) => handleProductUpdate(e, "delete")}
            >
              Delete
            </Button>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <Button type="button" variant="outline" onClick={dismissModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {props.initialValues ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

const mutateProduct = async (props: {
  values: Omit<Product, "id" | "storeId"> & { id?: number };
  action: "create" | "update" | "delete";
  newImages?: ProductImages[];
  initialValues?: Omit<Product, "images"> & { images: ProductImages[] };
  imagesToDelete?: ProductImages[];
}) => {
  if (props.action === "create") {
    return await fetch(apiRoutes.product, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productValues: props.values,
      }),
    });
  } else if (props.action === "update") {
    return await fetch(apiRoutes.product, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productValues: {
          ...props.values,
          images: [
            ...(props.initialValues?.images as []),
            ...(props.newImages ?? []),
          ].filter(
            (item) =>
              props.imagesToDelete && !props.imagesToDelete.includes(item)
          ),
        },
      }),
    });
  } else if (props.action === "delete") {
    return await fetch(`${apiRoutes.product}?id=${props.values.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
