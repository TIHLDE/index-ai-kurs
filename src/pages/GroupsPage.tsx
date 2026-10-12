import { GroupIdentity } from "#/components/group-identity";
import { Card, CardContent } from "#/components/ui/card";
import { groupSections, groups } from "#/data/groups";

export function GroupsPage() {
    const sections = groupSections
        .map((section) => ({
            ...section,
            items: groups.filter((group) => group.type === section.type),
        }))
        .filter((section) => section.items.length > 0);

    return (
        <div className="container mx-auto flex w-full flex-col gap-4 px-4 py-8">
            <h1 className="text-center text-2xl">Gruppeoversikt</h1>

            <div className="flex flex-col gap-6">
                {sections.map((section) => (
                    <section key={section.type} className="flex flex-col gap-3">
                        <h2 className="text-lg font-semibold">{section.label}</h2>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {section.items.map((group) => (
                                <Card key={group.id} size="sm" className="h-full">
                                    <CardContent className="flex items-center gap-3">
                                        <GroupIdentity
                                            name={group.name}
                                            email={group.email}
                                            logoUrl={group.logoUrl}
                                        />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
