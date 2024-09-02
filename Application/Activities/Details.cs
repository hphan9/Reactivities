using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id;

            public Query(Guid id)
            {
                Id = id;
            }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;
            public Handler(DataContext dataContext){
                _context = dataContext;
            }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
               return await _context.Activities.FindAsync(request.Id);
            }

        }
    }
}