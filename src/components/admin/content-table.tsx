import Link from "next/link";
import { ImageIcon, Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format";
import { DeleteButton } from "./delete-button";
import { FeaturedToggle, PublishToggle } from "./row-toggles";

export type AdminRow = {
  id: string;
  title: string;
  subtitle?: string | null;
  image?: string | null;
  published: boolean;
  featured?: boolean;
  sort_order: number;
  updated_at: string;
};

export function ContentTable({
  table,
  rows,
  basePath,
  showImage = false,
  showFeatured = false,
}: {
  table: string;
  rows: AdminRow[];
  basePath: string;
  showImage?: boolean;
  showFeatured?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-5">Title</TableHead>
            <TableHead>Status</TableHead>
            {showFeatured && <TableHead className="hidden sm:table-cell">Featured</TableHead>}
            <TableHead className="hidden md:table-cell">Order</TableHead>
            <TableHead className="hidden md:table-cell">Updated</TableHead>
            <TableHead className="pr-5 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="pl-5">
                <Link href={`${basePath}/${row.id}`} className="flex items-center gap-3">
                  {showImage && (
                    <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-md border bg-muted">
                      {row.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={row.image} alt="" className="size-full object-cover" />
                      ) : (
                        <ImageIcon className="size-4 text-muted-foreground" />
                      )}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{row.title}</span>
                    {row.subtitle && (
                      <span className="block max-w-[16rem] truncate text-xs text-muted-foreground">{row.subtitle}</span>
                    )}
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                <PublishToggle table={table} id={row.id} published={row.published} />
              </TableCell>
              {showFeatured && (
                <TableCell className="hidden sm:table-cell">
                  <FeaturedToggle table={table} id={row.id} featured={Boolean(row.featured)} />
                </TableCell>
              )}
              <TableCell className="hidden font-mono text-xs text-muted-foreground md:table-cell">
                {row.sort_order}
              </TableCell>
              <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                {formatDate(row.updated_at)}
              </TableCell>
              <TableCell className="pr-5 text-right">
                <div className="inline-flex items-center gap-1">
                  <Button asChild variant="ghost" size="icon-sm" aria-label={`Edit ${row.title}`}>
                    <Link href={`${basePath}/${row.id}`}>
                      <Pencil />
                    </Link>
                  </Button>
                  <DeleteButton table={table} id={row.id} label={row.title} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  href,
  cta,
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed bg-card/50 px-6 py-20 text-center">
      <div className="mx-auto max-w-sm">
        <h2 className="display text-3xl">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <Button asChild className="mt-6">
          <Link href={href}>
            <Plus /> {cta}
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function NewButton({ href, label }: { href: string; label: string }) {
  return (
    <Button asChild size="lg" className="gap-2 px-4">
      <Link id={`new-${label.toLowerCase().replace(/\s+/g, "-")}`} href={href}>
        <Plus /> {label}
      </Link>
    </Button>
  );
}
