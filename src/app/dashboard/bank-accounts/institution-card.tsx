import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import AppLogo from "@/app/icon.svg";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  name: string;
  logoURL: string | null | undefined;
};

export default function InstitutionCard({ name, logoURL }: Props) {
  return (
      <Card className="w-48">
        <CardContent className="p-3">
          <Image src={logoURL ?? AppLogo} width={500} height={500} alt="Thumbnail" className="aspect-square rounded-md mb-2 w-full! bg-gray-100" />
          {/* <div className="aspect-square rounded-md bg-gray-100 mb-2">
            <div className="flex items-center justify-center h-full text-muted-foreground text-xs">Product Image</div>
          </div> */}
          <CardTitle className="text-sm mb-2">{name}</CardTitle>
          {/* <CardDescription className="text-xs mb-2 line-clamp-2">High-quality wireless headphones</CardDescription>
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex">
              {[1, 2, 3, 4].map((star) => (
                <StarIcon key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
              <StarIcon className="h-3 w-3 text-gray-300" />
            </div>
            <span className="text-xs text-muted-foreground">(4.0)</span>
          </div> */}
          <div className="flex items-center justify-between">
            {/* <span className="text-sm font-bold">$199</span> */}
            <Button size="sm" variant="destructive" className="text-xs px-2 py-1 h-7">
              Remove
            </Button>
          </div>
        </CardContent>
      </Card>
  );
}
