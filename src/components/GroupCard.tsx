import type { Group } from "../data/groups";

export function GroupCard({ group }: { group: Group }) {
    return (
        <article className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-semibold">{group.name}</h3>
            <p className="text-sm text-slate-600">{group.description}</p>
            <p className="mt-auto pt-2 text-sm font-medium text-slate-700">{group.members} medlemmer</p>
        </article>
    );
}
