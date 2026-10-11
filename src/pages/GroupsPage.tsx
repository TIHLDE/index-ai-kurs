import { GroupCard } from "../components/GroupCard";
import { groups, groupTypes, type GroupType } from "../data/groups";

const headings: Record<GroupType, string> = {
    Undergruppe: "Undergrupper",
    Komité: "Komiteer",
    Interessegruppe: "Interessegrupper",
};

export function GroupsPage() {
    return (
        <div className="flex flex-col gap-10">
            <div>
                <h1 className="text-3xl font-bold">Grupper</h1>
                <p className="mt-2 text-slate-600">Her er alle gruppene i linjeforeningen.</p>
            </div>
            {groupTypes.map((type) => (
                <section key={type}>
                    <h2 className="mb-4 text-2xl font-bold">{headings[type]}</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {groups
                            .filter((group) => group.type === type)
                            .map((group) => (
                                <GroupCard key={group.id} group={group} />
                            ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
