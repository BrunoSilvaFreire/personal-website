
> How should I approach this?
  
Probably one of the most asked questions by developers around the world of all time.  
Now, if you're a game developer, this may be more frequent to you. Turns out, games are hard to make, specially
because there are so many parts that interact with each other.  


# Case: Datenshi
Datenshi is a game I've been working on for far too long. It's probably the first big project that I've tried 

...

Chances are you've probably already tried doing something like this: 
```csharp
public class Entity : MonoBehaviour {
}

public class LivingEntity : Entity {

    private uint health = 20, maxHealth = 20;

    public uint Health {
        /.../
    }

    public uint MaxHealth {
        /.../
    }
}
```

The problem is you're not using [Composition over Inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance)

# Case: LightSpeed
```csharp
p
```